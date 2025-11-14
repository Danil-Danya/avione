<template>
    <div class="passenger__card">
        <div class="passenger__card-top">
            <h3 class="title passenger__card-title">Kozimbek Raxmonaliyev</h3>
            <div class="passenger__card-buttons">
                <DeleteButton />
                <Button text="Редактировать" background="#CCCCCC" padding="10px" />
            </div>
        </div>
        <div class="passenger__card-bottom">
            <div class="passenger__card-grid">
                <div 
                    class="passenger__card-item" 
                    v-for="(item, index) in passengerCardData.fields" 
                    :key="index"
                >
                    <p class="passenger__card-label">{{ item.label }}</p>
                    <p class="passenger__card-value">{{ item.value }}</p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">

    import Button from '~/shared-ui/ui/Button.vue';
    import DeleteButton from '~/shared-ui/ui/DeleteButton.vue';

    const passengerCardData = ref({
        name: "Kozimbek Raxmonaliyev",
        fields: [
            { label: "Дата рождения:", value: "2002-05-28" },
            { label: "Номер документа:", value: "0059466" },
            { label: "Дата выдачи паспорта:", value: "2020-07-04" },
            { label: "Тип документа:", value: "Заграничный паспорт" },
            { label: "Срок действия паспорта:", value: "2028-07-04" },
        ]
    });


</script>

<style lang="scss">
    @import '~/assets/styles/widgets/passenger-card.scss';
</style>