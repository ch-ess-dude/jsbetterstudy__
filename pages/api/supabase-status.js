export default function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null
  const configured = Boolean(url && anon)
  res.status(200).json({ configured, url: configured ? 'set' : (url ? 'set' : 'missing'), anon: configured ? 'set' : (anon ? 'set' : 'missing') })
}
