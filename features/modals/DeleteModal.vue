<template>
    <section class="booking__modal delete">
        <div
            class="booking__modal-overlay"
            @click="onCancel"
        />

        <div class="booking__modal-content delete">
            <div class="booking__modal-header">
                <h2 class="booking__modal-title">
                    {{ $t('deleteEntity', { entity: entityName }) }}
                </h2>
            </div>

            <div class="booking__modal-body">
                <p class="booking__modal-text">
                    {{ $t('deleteConfirmText') }}
                    <span v-if="entityTitle" class="booking__modal-entity">
                        {{ entityTitle }}
                    </span>
                    ?
                </p>

                <p class="booking__modal-warning">
                    {{ $t('deleteIrreversible') }}
                </p>
            </div>

            <div class="booking__modal-actions">
                <Button
                    padding="12px 36px"
                    background="#EE2532"
                    :text="$t('deleteButton')"
                    @click="onConfirm"
                />

                <Button
                    padding="12px 36px"
                    background="#2E4AB5"
                    :text="$t('cancelButton')"
                    @click="onCancel"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import Button from '~/shared-ui/ui/Button.vue';

    const props = defineProps<{
        entityName: string;
        entityTitle?: string;
    }>();

    const emit = defineEmits<{
        (e: 'confirm'): void;
        (e: 'cancel'): void;
    }>();

    const onConfirm = () => {
        emit('confirm');
    };

    const onCancel = () => {
        emit('cancel');
    };

</script>

<style lang="scss">
    @import '@/assets/styles/features/modals/books.scss';
</style>
