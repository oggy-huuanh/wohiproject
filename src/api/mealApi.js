// TheMealDB API helpers. Docs: https://www.themealdb.com/api.php
const BASE = 'https://www.themealdb.com/api/json/v1/1'

// URL builders for each endpoint
export const urls = {
  random: () => `${BASE}/random.php`,
  categories: () => `${BASE}/categories.php`,
  ingredients: () => `${BASE}/list.php?i=list`,
  byCategory: (category) =>
    `${BASE}/filter.php?c=${encodeURIComponent(category)}`,
  byIngredient: (ingredient) =>
    `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`,
  byId: (id) => `${BASE}/lookup.php?i=${encodeURIComponent(id)}`,
}

// Fetches a URL and returns its list ([] when nothing is found)
export async function fetchJson(url) {
  let response

  // Network failure: show a clearer message than "Failed to fetch"
  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'Could not reach the recipe server. Check your internet connection and try again.',
    )
  }

  // fetch does not reject on 404/500, so check response.ok
  if (!response.ok) {
    throw new Error(
      `The recipe server had a problem (status ${response.status}). Please try again later.`,
    )
  }

  const data = await response.json()
  return data.meals ?? data.categories ?? []
}

// One request per ingredient, then rank meals by number of matches
export async function findMealsByIngredients(ingredients) {
  const lists = await Promise.all(
    ingredients.map((ingredient) => fetchJson(urls.byIngredient(ingredient))),
  )

  const found = new Map()

  for (const list of lists) {
    for (const meal of list) {
      const existing = found.get(meal.idMeal)
      if (existing) {
        existing.matchCount += 1
      } else {
        found.set(meal.idMeal, { ...meal, matchCount: 1 })
      }
    }
  }

  // Most matching ingredients first, then alphabetical order
  return [...found.values()].sort(
    (a, b) =>
      b.matchCount - a.matchCount || a.strMeal.localeCompare(b.strMeal),
  )
}

// Turns strIngredient1..20 / strMeasure1..20 into [{ name, measure }]
export function getIngredientList(meal) {
  const list = []

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (name && name.trim()) {
      list.push({ name: name.trim(), measure: measure ? measure.trim() : '' })
    }
  }

  return list
}
