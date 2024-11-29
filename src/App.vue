<script setup lang="ts">
import { ref } from 'vue'
import CalculatorSVG from './assets/SVG/CalculatorSVG.vue'
import EmptySVG from './assets/SVG/EmptySVG.vue'
const error = ref({
  amount: false,
  term: false,
  rate: false,
  type: false,
  setAllFalse() {
    this.amount = false
    this.rate = false
    this.term = false
    this.type = false
  },
})
const result = ref({
  total: 0,
  repayment: 0,
  origin: 0,
})
const focusElement = ref<'amount' | 'rate' | 'term' | null>()
const option = ref<{
  replay: boolean
  interest: boolean
  amount: number | null
  term: number | null
  rate: number | null
  optionAreOk: () => boolean
  reset: () => void
}>({
  replay: false,
  interest: false,
  amount: null,
  term: null,
  rate: null,
  optionAreOk() {
    if (
      (this.replay || this.interest) &&
      !this.amount &&
      this.amount !== null &&
      !isNaN(this.amount) &&
      !this.term &&
      this.term !== null &&
      !isNaN(this.term) &&
      !this.rate &&
      this.rate !== null &&
      !isNaN(this.rate)
    )
      return true
    else return false
  },
  reset() {
    this.term = null
    this.rate = null
    this.replay = false
    this.interest = false
    this.amount = null
  },
})

function setFocus(element: 'amount' | 'rate' | 'term' | null) {
  if (element !== null) {
    error.value[element] = false
  }
  focusElement.value = element
}

function calculate() {
  error.value.setAllFalse()
  if (option.value.optionAreOk()) {
    const rateValue = option.value.rate! / 100
    const rateMonthly = rateValue / 12
    const numberOfMonth = option.value.term! * 12
    const MonthlyValue =
      (option.value.amount! * rateMonthly * Math.pow(1 + rateMonthly, numberOfMonth)) /
      (Math.pow(1 + rateMonthly, numberOfMonth) - 1)
    result.value.repayment = MonthlyValue
    result.value.total = MonthlyValue * 12 * option.value.term!
    result.value.origin = option.value.amount!
  } else {
    if (option.value.amount === null || isNaN(option!.value.amount)) error.value.amount = true
    if (option.value.rate === null || isNaN(option!.value.rate)) error.value.rate = true
    if (option.value.term === null || isNaN(option!.value.term)) error.value.term = true
    if (!option.value.interest && !option.value.replay) error.value.type = true
  }
}
</script>

<template>
  <div class="md:grid md:items-center md:w-full md:h-screen bg-neutral md:justify-center">
    <div
      class="flex flex-col md:flex-row max-w-700px text-size-sm bg-white md:rounded-lg md:overflow-hidden"
    >
      <div class="grid p-4 w-full">
        <div class="flex flex-col md:flex-row md:justify-between">
          <h1 class="text-size-2xl font-700 md:text-size-lg">Mortgage Calculator</h1>
          <button
            class="justify-self-start w-[fit-content] neutral-slate700 underline text-size-sm md:text-size-xs"
            @click="option.reset"
          >
            Clear All
          </button>
        </div>

        <div class="grid m-y-10px gap-3">
          <label class="neutral-slate700 font-500" for="amount">Mortgage Amount</label>
          <div
            :class="{
              'w-full relative border-1px b-black rounded-1 overflow-hidden h-10': true,
              '!b-amber': focusElement === 'amount',
              '!b-red-4': error.amount,
            }"
          >
            <div
              :class="{
                'h-full absolute w-8 grid justify-center items-center neutral-slate100': true,
                '!bg-primary-lime': focusElement === 'amount',
                '!bg-red-4': error.amount,
              }"
            >
              <p
                :class="{
                  'text-size-xs neutral-slate700 font-700': true,
                }"
              >
                £
              </p>
            </div>
            <input
              type="number"
              class="h-full w-full p-x-12 outline-none"
              @focus="setFocus('amount')"
              name="amount"
              id="amount"
              min="0"
              v-model="option.amount"
              @blur="setFocus(null)"
            />
          </div>
          <p v-if="error.amount" class="color-red-5 text-size-3">This field is required</p>
        </div>
        <div class="md:flex md:items-start w-full gap-3">
          <div class="grid m-b-10px gap-3 w-full">
            <label class="neutral-slate700 font-500" for="term">Mortgage Term</label>
            <div
              :class="{
                'w-full relative border-1px b-black rounded-1 overflow-hidden h-10': true,
                '!b-amber': focusElement === 'term',
                '!b-red-4': error.term,
              }"
            >
              <div
                :class="{
                  'h-full absolute w-12 grid justify-center items-center neutral-slate100 right-0': true,
                  '!bg-primary-lime': focusElement === 'term',
                  '!bg-red-4': error.term,
                }"
              >
                <p
                  :class="{
                    'text-size-xs neutral-slate700 font-700': true,
                    '!bg-bg-primary-lime': focusElement === 'term',
                  }"
                >
                  years
                </p>
              </div>
              <input
                type="number"
                class="h-full w-full p-l-4 p-r-12 outline-none"
                name="term"
                id="term"
                min="1"
                max="80"
                v-model="option.term"
                @focus="setFocus('term')"
                @blur="setFocus(null)"
              />
            </div>
            <p v-if="error.term" class="color-red-5 text-size-3">This field is required</p>
          </div>
          <div class="grid m-b-10px gap-3 w-full">
            <label class="neutral-slate700 font-500" for="rate">Interest Rate</label>
            <div
              :class="{
                'w-full relative border-1px b-black rounded-1 overflow-hidden h-10': true,
                '!b-amber': focusElement === 'rate',
                '!b-red-4': error.rate,
              }"
            >
              <div
                :class="{
                  'h-full absolute w-8 grid justify-center items-center neutral-slate100 right-0': true,
                  '!bg-primary-lime': focusElement === 'rate',
                  '!bg-red-4': error.rate,
                }"
              >
                <p
                  :class="{
                    'text-size-xs neutral-slate700 font-700': true,
                    '!bg-bg-primary-lime': focusElement === 'rate',
                  }"
                >
                  %
                </p>
              </div>
              <input
                type="number"
                class="h-full w-full p-l-4 p-r-9 outline-none"
                @focus="setFocus('rate')"
                name="rate"
                min="0"
                max="100"
                v-model="option.rate"
                id="rate"
                @blur="setFocus(null)"
              />
            </div>
            <p v-if="error.rate" class="color-red-5 text-size-3">This field is required</p>
          </div>
        </div>
        <div class="grid m-b-20px gap-3">
          <label class="neutral-slate700 font-500">Mortgage Type</label>
          <div
            :class="{
              'w-full relative border-1px rounded-1 overflow-hidden  h-10 flex items-center gap-4 p-4 hover:border-amber': true,
              'b-black': !option.replay,
              'b-amber bg-amber bg-opacity-10': option.replay,
            }"
            @click="
              () => {
                error.type = false
                option.replay = true
                option.interest = false
              }
            "
          >
            <input
              type="checkbox"
              class="hidden peer"
              name="repay"
              id="repay"
              v-model="option.replay"
              @change="option.interest = false"
            />
            <div
              :class="{
                'flex justify-center items-center w-20px h-20px border-2 border-bluegray rounded-full': true,
                '!border-amber': option.replay,
              }"
            >
              <div
                :class="{
                  'h-10px w-10px rounded-full': true,
                  'bg-amber': option.replay,
                }"
              ></div>
            </div>
            <label class="font-700 text-size-xs">Repayement</label>
          </div>
          <div
            :class="{
              'w-full relative border-1px rounded-1 overflow-hidden  h-10 flex items-center gap-4 p-4 hover:border-amber': true,
              'b-black': !option.interest,
              'b-amber bg-amber bg-opacity-10': option.interest,
            }"
            @click="
              () => {
                error.type = false
                option.replay = false
                option.interest = true
              }
            "
          >
            <input
              type="checkbox"
              class="hidden"
              name="interest"
              id="interest"
              v-model="option.interest"
              @change="option.replay = false"
            />
            <div
              :class="{
                'flex justify-center items-center w-20px h-20px border-2 border-bluegray rounded-full': true,
                '!border-amber': option.interest,
              }"
            >
              <div
                :class="{
                  'h-10px w-10px rounded-full': true,
                  'bg-amber': option.interest,
                }"
              ></div>
            </div>
            <label class="font-700 text-size-xs">Interest Only</label>
          </div>
          <p v-if="error.type" class="color-red-5 text-size-3">This field is required</p>
        </div>
        <button
          @click="calculate"
          class="text-size-xs !p-2 hover:brightness-110 w-full bg-primary-lime neutral-slate900 p-4 rounded-full flex items-center gap-5 justify-center neutral-slate900 font-700"
        >
          <CalculatorSVG size="16"></CalculatorSVG>
          Calculate Repayements
        </button>
      </div>
      <div
        class="bg-neutral-700 color-white p5 md:rounded-bl-70px md:grid md:place-items-center md:max-w-40%"
      >
        <div v-if="result.total === 0" class="flex flex-col justify-center items-center gap-4">
          <EmptySVG></EmptySVG>
          <h1 class="text-size-2xl">Result shown here</h1>
          <p class="neutral-slate500 text-center">
            Complete the form and click "Calculate Repayment" to see what your monthly repayments
            would be
          </p>
        </div>
        <div v-else class="flex flex-col gap-4 md:gap-1">
          <h1 class="text-size-xl m-b-4 md:text-size-sm md:m-b-1">Your result</h1>
          <p class="neutral-slate500 m-b-4 md:m-b-1">
            Your results are shown below based on the information you provided.To adjust the
            results, edit the form and click "calculate repayment" again
          </p>
          <div class="bg-neutral-900 rounded-4 p-4 shadow-el m-t-2">
            <div
              v-if="option.replay"
              class="flex flex-col gap-3 md:gap-2 justify-start items-start"
            >
              <p class="neutral-slate500">Your monthly repayment</p>
              <p class="primary-lime font-700 text-size-4xl">£ {{ result.repayment.toFixed(2) }}</p>
              <div class="h-2px w-full bg-neutral-700"></div>
              <p class="neutral-slate500 m-t-1">Total you'll repay over the terms</p>
              <p class="pcolor-white font-700 text-size-2xl">£ {{ result.total.toFixed(2) }}</p>
            </div>
            <div v-else class="flex flex-col gap-3 justify-start items-start">
              <p class="neutral-slate500">The interest for your setup</p>
              <p class="primary-lime font-700 text-size-4xl">
                £ {{ (result.total - result.origin).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-el {
  box-shadow: 0px -3px 0px 0px yellow;
}
</style>
