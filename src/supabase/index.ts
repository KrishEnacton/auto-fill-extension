import { createClient } from '@supabase/supabase-js'
import { Config } from '../utils/config'

const supabaseUrl = Config.SUPABASE_URL
const supabaseKey = Config.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, Config.SUPABASE_SERVICE_ROLE, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
