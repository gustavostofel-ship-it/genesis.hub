import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rukyqlyoyxnsujrobrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a3lxbHlveXhuc3Vqcm9icm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3OTY3NjUsImV4cCI6MjEwNjM3Mjc2NX0.62wRdgVr_u8F6wNGMgP61x8ub5IBYEs6h0BH9LWFYiI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function diagnose() {
  console.log('--- DIAGNÓSTICO SUPABASE ---');

  // 1. Tentar Login
  console.log('\n[1] Autenticação:');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'gustavostofel@genesisbeneficios.com.br',
    password: 'Genesis2026@',
  });

  if (authError) {
    console.error('Erro de Login:', authError.message);
  } else {
    console.log('Login Sucesso! Usuário:', authData.user?.email, '| ID:', authData.user?.id);
  }

  // 2. Verificar Notifications
  console.log('\n[2] Tabela: notifications');
  const { data: notifData, error: notifError } = await supabase.from('notifications').select('*').limit(5);
  if (notifError) {
    console.error('Erro ao ler notifications:', notifError.message);
  } else {
    console.log('Notifications lidas com sucesso. Count:', notifData.length);
  }

  // 3. Verificar outras tabelas (esperamos que falhem ou não existam)
  console.log('\n[3] Tabela: profiles');
  const { data: profData, error: profError } = await supabase.from('profiles').select('*').limit(1);
  if (profError) {
    console.error('Erro ao ler profiles:', profError.message);
  } else {
    console.log('Profiles existe!');
  }

  // 4. Testar Storage
  console.log('\n[4] Storage:');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.error('Erro ao listar buckets:', bucketsError.message);
  } else {
    console.log('Buckets encontrados:', buckets.map(b => b.name));
    
    // Tentar criar um arquivo de teste num bucket genérico, por ex. 'avatars' se existir
    if (buckets.length > 0) {
      const bucket = buckets[0].name;
      console.log(`Tentando upload no bucket ${bucket}...`);
      const { data: uploadData, error: uploadError } = await supabase.storage.from(bucket).upload('teste.txt', 'Hello World', { upsert: true });
      if (uploadError) {
         console.error('Erro no upload:', uploadError.message);
      } else {
         console.log('Upload de teste feito com sucesso no bucket', bucket);
      }
    } else {
      console.log('Nenhum bucket encontrado. Testando upload num bucket fictício "avatars"...');
      const { data: uploadData, error: uploadError } = await supabase.storage.from('avatars').upload('teste.txt', 'Hello World', { upsert: true });
      if (uploadError) {
         console.error('Erro no upload (bucket avatars):', uploadError.message);
      } else {
         console.log('Upload sucesso no bucket avatars!');
      }
    }
  }

  console.log('\n--- FIM DO DIAGNÓSTICO ---');
}

diagnose();
