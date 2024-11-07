import supabase, { supabaseUrl } from "./supabase";

export async function getNests() {
  const { data, error } = await supabase.from("nests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Nests could not be loaded");
  }

  return data;
}

export async function createEditNest(newNest, id) {
  const hasImagePath = newNest.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newNest.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newNest.image
    : `${supabaseUrl}/storage/v1/object/public/123/${imageName}`;

  // 1. Create/edit nest
  let query = supabase.from("nests");

  // A) CREATE
  if (!id) query = query.insert([{ ...newNest, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newNest, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Nest could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("123")
    .upload(imageName, newNest.image);

  // 3. Delete the nest IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("nests").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Nest image could not be uploaded and the nest was not created"
    );
  }

  return data;
}

export async function deleteNest(id) {
  const { data, error } = await supabase.from("nests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Nest could not be deleted");
  }

  return data;
}
