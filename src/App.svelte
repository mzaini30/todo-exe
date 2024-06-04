<script>
  import localforage from "localforage";
  import { acak } from "kumpulan-tools";
  import shopee from "./shopee.yaml";
  import Whatsapp from "./icon/whatsapp.svelte";

  let todo = [];
  let baru = "";
  let status = "";

  async function init() {
    let dapatkanTodo = await localforage.getItem("todo");
    if (dapatkanTodo) {
      todo = dapatkanTodo;
    }
  }
  init();

  async function tambahBaru() {
    todo = [
      ...todo,
      {
        id: crypto.randomUUID(),
        todo: baru,
        status,
      },
    ];
    await localforage.setItem("todo", todo);
    baru = "";
    status = "";
  }

  async function hapus(id) {
    todo = todo.filter((x) => x.id != id);
    await localforage.setItem("todo", todo);
  }
</script>

<h1>TODO</h1>

<form on:submit|preventDefault={tambahBaru} action="">
  <label for="">TODO Baru</label>
  <input bind:value={baru} type="text" required />
  <label for="">Status</label>
  <select bind:value={status} name="" required id="">
    <option value="kerjaanBaru">Kerjaan Baru</option>
    <option value="revisi">Revisi</option>
  </select>
  <input type="submit" value="Tambahkan" />
</form>

<h2>Revisi</h2>
<ol class="item">
  {#each acak(todo) as item}
    {#if item.status == "revisi"}
      <li>
        <span> {item.todo}</span>
        <a on:click|preventDefault={() => hapus(item.id)} href="/">Selesai</a>
      </li>
    {/if}
  {/each}
</ol>

<h2>Kerjaan Baru</h2>
<ol class="item">
  {#each acak(todo) as item}
    {#if item.status == "kerjaanBaru"}
      <li>
        <span> {item.todo}</span>
        <a on:click|preventDefault={() => hapus(item.id)} href="/">Selesai</a>
      </li>
    {/if}
  {/each}
</ol>

<h2>Store</h2>

{#each shopee as item}
  <p>
    <a href={item.link} target="_blank">
      <img src={item.gambar} alt="" />
    </a>
  </p>
{/each}

<a
  href="https://chat.whatsapp.com/B6gUdBiQU4U7Yi2rsQcwV5"
  target="_blank"
  class="wa"
>
  <Whatsapp></Whatsapp>
</a>

<style>
  @media (max-width: 450px) {
    ol.item > * + * {
      margin-top: 20px;
    }
    ol.item {
    }
  }
  a.wa {
    position: fixed;
    right: 0;
    bottom: 0;
  }
  a.wa.s-XsEmFtvddWTw {
  }
</style>
