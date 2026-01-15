<template>
    <input 
        ref="inputRef"
        :type="type"
        :placeholder="placeholder"
        :style="{ width }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="input"
    >
</template>

<script setup lang="ts">
    import IMask from "imask";

    const props = defineProps({
        modelValue: String,
        type: { type: String, default: "text" },
        placeholder: String,
        width: String,
        mask: { type: [String, Object], default: null }   // <— ДОБАВИЛИ
    });

    const emit = defineEmits(["update:modelValue"]);
    const inputRef = ref(null);

    onMounted(() => {
        if (props.mask && inputRef.value) {
            let maskOptions;

            if (typeof props.mask === "string") {
                maskOptions = { mask: props.mask };
            }
            else {
                maskOptions = props.mask;
            }

            const mask = IMask(inputRef.value, maskOptions);

            mask.on("accept", () => {
                emit("update:modelValue", mask.value);
            });
        }
    });
</script>