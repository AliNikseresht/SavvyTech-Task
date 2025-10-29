import { supabase } from "../libs/supabase";
import type { Item } from "../types/item";

export async function fetchItems(): Promise<Item[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("date_created", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addItem(title: string, subtitle: string) {
  const { error } = await supabase.from("items").insert([{ title, subtitle }]);
  if (error) throw new Error(error.message);
}

export async function editItem(id: string, title: string, subtitle: string) {
  const { error } = await supabase
    .from("items")
    .update({ title, subtitle })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
