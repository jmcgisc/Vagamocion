import { createClient } from '@supabase/supabase-js';

const supabase = createClient(

  'https://dfhulxkgsfhjgoqlyolv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaHVseGtnc2ZoamdvcWx5b2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDc5MDIsImV4cCI6MjA2MzEyMzkwMn0.MvP7PoR3l8TMI0tjapjxZVYrO1sq0ZSGIRqRinnHB2o' // no uses la secreta aquí
);

export async function subirImagen(file) {
  const fileName = `testimonio-${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from("testimonios")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("testimonios")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
