import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://csqjqsvmkzuiijkruefc.supabase.co'
const supabaseKey = 'sb_publishable_qODf0-nrWhUCgUXk08lLRw_54WvjTnj'

export const supabase = createClient(supabaseUrl, supabaseKey)
