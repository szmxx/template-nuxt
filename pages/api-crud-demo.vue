<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8"
  >
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">CRUD Demo</h1>

      <!-- GET Items -->
      <section class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">All Items</h2>
          <div class="flex gap-2">
            <button @click="fetchItems()" class="btn-primary">
              Fetch Items
            </button>
            <button @click="abortFetch()" class="btn-warning">
              Abort Fetch
            </button>
          </div>
        </div>
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <div v-if="error" class="text-center text-red-500">
          Error: {{ error.message }}
        </div>
        <ul v-if="items && items.length" class="space-y-3">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
          >
            <span>{{ item.name }}</span>
            <div class="flex gap-2">
              <button @click="startEdit(item)" class="btn-secondary btn-sm">
                Edit
              </button>
              <button @click="deleteItem(item.id)" class="btn-danger btn-sm">
                Delete
              </button>
            </div>
          </li>
        </ul>
        <p v-else-if="!pending" class="text-center text-gray-500">
          No items found.
        </p>
      </section>

      <!-- POST/PUT Item Form -->
      <section class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">
          {{ isEditing ? "Update Item" : "Create Item" }}
        </h2>
        <form
          @submit.prevent="isEditing ? updateItem() : createItem()"
          class="space-y-4"
        >
          <div>
            <label for="itemName" class="block text-sm font-medium mb-1"
              >Name</label
            >
            <input
              id="itemName"
              v-model="form.name"
              placeholder="Enter item name"
              required
              class="input w-full"
            />
          </div>
          <div class="flex justify-end gap-4">
            <button
              v-if="isEditing"
              @click="cancelEdit"
              type="button"
              class="btn"
            >
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {{ isEditing ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface Item {
  id: number;
  name: string;
}

const {
  data: items,
  pending,
  error,
  refresh: fetchItems,
  abort: abortFetch,
} = useHttp<Item[]>("/items", {
  lazy: true,
  server: false,
});

const isEditing = ref(false);
const form = reactive<Partial<Item>>({
  id: undefined,
  name: "",
});

function startEdit(item: Item) {
  isEditing.value = true;
  form.id = item.id;
  form.name = item.name;
}

function cancelEdit() {
  isEditing.value = false;
  form.id = undefined;
  form.name = "";
}

async function createItem() {
  if (!form.name) return;
  await useHttp("/items", {
    method: "POST",
    body: { name: form.name },
  });
  form.name = "";
  fetchItems();
}

async function updateItem() {
  if (!form.id || !form.name) return;
  await useHttp(`/items/${form.id}`, {
    method: "PUT",
    body: { name: form.name },
  });
  cancelEdit();
  fetchItems();
}

async function deleteItem(id: number) {
  await useHttp(`/items/${id}`, {
    method: "DELETE",
  });
  fetchItems();
}
</script>

<style>
/* Using UnoCSS utility classes, so scoped styles are not needed. */
</style>
