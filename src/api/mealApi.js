// Everything that knows about TheMealDB lives in this file.
// Pages and hooks import from here, so the API address is written only once.
// Docs: https://www.themealdb.com/api.php  ("1" is the free test API key)
const BASE = 'https://www.themealdb.com/api/json/v1/1'

// Functions that build the URL for each endpoint we use.
// encodeURIComponent makes names like "Chicken Breast" safe to put in a URL.
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

// Fetches a URL and returns the list inside the response.
// TheMealDB always answers with an object that holds one list:
// { meals: [...] } or { categories: [...] }. When nothing is found it sends
// { meals: null }, so we turn that into an empty array. This way the rest of
// the app can always use .map() and .length without checking for null.
export async function fetchJson(url) {
  let response

  // fetch rejects only when the request itself fails (no internet, server
  // unreachable). The browser's own text for that is "Failed to fetch",
  // which means little to a user, so we replace it with a clearer message.
  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'Could not reach the recipe server. Check your internet connection and try again.',
    )
  }

  // A 404 or 500 answer still "succeeds" for fetch, so we have to check
  // response.ok ourselves.
  if (!response.ok) {
    throw new Error(
      `The recipe server had a problem (status ${response.status}). Please try again later.`,
    )
  }

  const data = await response.json()
  return data.meals ?? data.categories ?? []
}

// Finds meals that use the given ingredients, best matches first.
// The free API can filter by only ONE ingredient per request, so we send one
// request per ingredient at the same time (Promise.all) and then count how
// many of the result lists each meal appears in.
export async function findMealsByIngredients(ingredients) {
  const lists = await Promise.all(
    ingredients.map((ingredient) => fetchJson(urls.byIngredient(ingredient))),
  )

  // idMeal -> meal object with a matchCount
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

// A full meal has its ingredients in 20 numbered fields
// (strIngredient1 ... strIngredient20 and strMeasure1 ... strMeasure20),
// and unused ones are empty. This turns them into a normal array:
// [{ name: 'Chicken', measure: '500g' }, ...]
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
