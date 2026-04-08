import { supabase } from './supabase.js'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function makeSlug(eventName) {
  const base = slugify(eventName || 'event')
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

window.createGuestLensNowEvent = async function () {
  const eventName = prompt('Enter your event name:')
  if (!eventName) return

  const hostName = prompt('Enter host name:')
  if (!hostName) return

  const hostEmail = prompt('Enter host email:')
  if (!hostEmail) return

  const hostPhone = prompt('Enter host phone:')
  if (!hostPhone) return

  const slug = makeSlug(eventName)

  const expiresAt = new Date(
    Date.now() + 14 * 24 * 60 * 60 * 1000
  ).toISOString()

  const { error } = await supabase.from('events').insert([
    {
      slug,
      event_name: eventName,
      host_name: hostName,
      host_email: hostEmail,
      host_phone: hostPhone,
      expires_at: expiresAt,
      paid_status: true
    }
  ])

  if (error) {
    console.error(error)
    alert('Error creating event')
    return
  }

  window.location.href = `events/instant-event.html?slug=${slug}&host=1`
}
