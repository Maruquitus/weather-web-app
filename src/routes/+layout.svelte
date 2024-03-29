<script lang="ts">
  import "../app.css";
  import Fa from "svelte-fa";
  import { Input } from "$lib/components/ui/input";
  import { faCloud } from "@fortawesome/free-solid-svg-icons";
  import { ModeWatcher } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Sun, Moon, Cloud } from "lucide-svelte";

  import { toggleMode } from "mode-watcher";
</script>

<div class="min-w-full min-h-screen flex flex-col bg-gray-200 dark:bg-gray-900">
  <header class="dark:bg-gray-800 bg-white flex h-20">
    <div class="flex w-full">
      <Cloud size={60} class="text-[#bbb] fill-[#bbb] dark:fill-[#7b7b91] dark:text-[#7b7b91] w-16 my-auto ml-6" />
      <Input on:keydown={(event) => {if (event.key == "Enter") {
        if (event.target instanceof HTMLInputElement) document.location.href = "/city/" + event.target.value;
      } }} placeholder="Pesquise uma cidade" class="focus-visible:ring-0 w-1/2 my-auto mx-auto"/>
      </div> 
        <Button
          class="ml-auto my-auto mr-4"
          on:click={toggleMode}
          variant="outline"
          size="icon"
        >
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
  </header>

  <slot />
</div>
<ModeWatcher />
