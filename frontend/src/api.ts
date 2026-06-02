export async function fetchContent() {
  const response = await fetch('/api/content')
  if (!response.ok) {
    throw new Error('Failed to fetch page content')
  }
  return response.json()
}

export async function saveContent(content: unknown) {
  const response = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
  if (!response.ok) {
    throw new Error('Failed to save page content')
  }
  const result = await response.json()
  return result.content
}
