  <template>
    <label data-id="InputArea" class="form-control">
      <div  v-if="props.maxLength" class="label pt-0">
        <span class="label-text-alt ml-auto">{{ valueModel.length + '/' + props.maxLength }}</span>
      </div>
      <textarea
        :class="`grow w-full textarea textarea-bordered bg-transparent` + resizeClass"
        v-bind="props"
        v-model="valueModel"
      ></textarea>
    </label>
  </template>

<script setup lang="ts">
const props = defineProps<{
  maxLength?: number | string
  required?: boolean
  placeholder?: string
  resize?: boolean
}>()
const valueModel = defineModel<string>({
  required: true,
})

const resizeClass = !props.resize ? '  resize-none' : ''
</script>
