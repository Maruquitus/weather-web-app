<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  /** @type {import('./$types').PageData} */
  import type { WeatherDataset } from "$lib/types";
  import Fa from "svelte-fa";
  import {
    faDroplet,
    faSun,
    faThermometer1,
    faWind,
  } from "@fortawesome/free-solid-svg-icons";
  export let data: WeatherDataset;
</script>

<div class="grid m-4 justify-items-center text-center items-center gap-6">
  <div class="flex h-40 w-full col-start-1 row-start-1 mt-10">
    <div class="flex flex-col place-content-evenly w-full text-left">
      <h1 class="text-4xl font-semibold dark:text-white text-slate-900">
        {data.current.city}
      </h1>
      <h1 class="text-2xl font-medium dark:text-gray-200 text-slate-900">
        {data.current.region}
      </h1>
      <h1 class="text-5xl mt-auto font-bold dark:text-white text-slate-900">
        {data.current.temp} ºC
      </h1>
    </div>

    <div class="flex flex-col ml-6 h-full w-full text-left">
      <img
        class="dark:text-white w-32 -mt-3 mx-auto"
        src={data.current.condition_icon.replaceAll("64", "128")}
        alt=""
      />
      <h1
        class="text-2xl text-center font-semibold dark:text-white text-slate-900"
      >
        {data.current.condition}
      </h1>
    </div>
  </div>
  <Card.Root
    class="max-[1024px]:row-start-4 max-[1024px]:row-end-4 max-[1024px]:col-start-1 row-start-1 row-end-4 col-start-2 row-span-4 h-full w-full text-left"
  >
    <Card.Header>
      <Card.Title>Previsão dos próximos dias</Card.Title>
    </Card.Header>
    <Card.Content>
      {#each data.week as item, index}
        <div class={`h-20 w-full flex`}>
          <h2 class="text-center my-auto font-semibold w-20">
            {item.date.slice(0, 1).toUpperCase() + item.date.slice(1)}
          </h2>
          <div class="flex -mr-20">
            <img
              alt="Clima no dia"
              class="scale-90"
              src={item.condition_icon.replaceAll("64", "128")}
            />
            <h2 class="my-auto ml-2 max-[625px]:hidden">
              {item.condition}
            </h2>
          </div>
          <h2 class="text-center font-semibold text-xl ml-auto my-auto w-32">
            {item.maxtemp_c && Math.round(item.maxtemp_c)}/{item.mintemp_c &&
              Math.round(item.mintemp_c)} ºC
          </h2>
        </div>
        {#if index != 6}
          <Separator />
        {/if}
      {/each}
    </Card.Content>
  </Card.Root>

  <Card.Root class="w-full text-left row-start-2 col-start-1">
    <Card.Header>
      <Card.Title>Previsão de hoje</Card.Title>
    </Card.Header>
    <Card.Content class="flex">
      {#each data.day as item, index}
        <div class={`w-1/6 flex-col`}>
          <h2 class="text-center font-semibold">
            {["6:00", "9:00", "12:00", "15:00", "18:00", "21:00"][index]}
          </h2>
          <img
            class="mx-auto"
            alt="Clima no horário"
            src={item.condition_icon}
          />
          <h2 class="text-center font-semibold text-xl">
            {Math.round(item.temp)} ºC
          </h2>
        </div>
        {#if index != 5}
          <Separator class="h-28" orientation="vertical" />
        {/if}
      {/each}
    </Card.Content>
  </Card.Root>

  <Card.Root class="w-full text-left row-start-3 col-start-1">
    <Card.Header>
      <Card.Title>Condições do Ar</Card.Title>
    </Card.Header>

    <Card.Content>
      <div class="grid grid-cols-2 text-xl">
        <div>
          <div class="flex">
            <Fa icon={faThermometer1} class="mr-2 my-auto" />
            <p>Sensação térmica:</p>
          </div>
          <h2 class="dark:text-white text-black ml-6 text-3xl font-semibold">
            {data.current.feelslike} ºC
          </h2>
        </div>
        <div>
          <div class="flex">
            <Fa icon={faDroplet} class="mr-2 my-auto" />
            <p>Umidade:</p>
          </div>
          <h2 class="dark:text-white text-black ml-6 text-3xl font-semibold">
            {data.current.humidity} %
          </h2>
        </div>
        <div>
          <div class="flex">
            <Fa icon={faWind} class="mr-2 my-auto" />
            <p>Vento:</p>
          </div>
          <h2 class="dark:text-white text-black ml-6 text-3xl font-semibold">
            {data.current.windspeed} km/h
          </h2>
        </div>
        <div>
          <div class="flex">
            <Fa icon={faSun} class="mr-2 my-auto" />
            <p>Índice de UV:</p>
          </div>
          <h2 class="dark:text-white text-black ml-6 text-3xl font-semibold">
            {data.current.uvindex}
          </h2>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</div>
