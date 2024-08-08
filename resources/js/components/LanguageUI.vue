<template>
    <div>
        <div class="o1-flex o1-items-center o1-space-x-0" v-if="field.value.style == 'button' || (field.value.style == 'mix' && field.value.locales.length <= field.value.convert_to_list_after)">
      <span v-for="local in field.value.locales" :key="local.value" class="o1-flex">
        <a class="text-gray-500 dark:text-gray-500" :title="(local.translated ? 'Translated' : 'Untranslated') + ' Language'"
           :class="getButtonClass(local) "
           href="#" @click.prevent="changeLocale(field,local.value)">
          {{ local.label }}
        </a>
        <a href="#" v-if="local.translated && translatedCount > 1"
           @click.prevent="openRemoveModal(local.value)"
           class="btn-delete text-gray-500 dark:text-gray-500">X</a>
      </span>
        </div>

        <div v-if="field.value.style == 'list' || (field.value.style == 'mix' && field.value.locales.length > field.value.convert_to_list_after)">
            <select :id="field.name" v-model="selectedLocale" class="w-full form-control form-select"
                    @change="emitChange">
                <option v-for="local in field.value.locales" :key="local.value" :value="local.value">
                    {{ local.label }}
                </option>
            </select>
        </div>

        <portal to="modals" transition="fade-transition">
            <component
                v-if="removeModalOpen"
                class="text-left"
                is="delete-resource-modal"
                @confirm="confirmDelete"
                @close="closeRemoveModal"
            />
        </portal>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
// import { router } from '@inertiajs/vue3';

export default {
    props: ["field", "resourceName"],

    setup(props, { emit }) {
        const selectedLocale = ref(window.Nova.appConfig.locale);
        const removeModalOpen = ref(false);
        const deletedItem = ref(null);


        const translatedCount = computed(() => {
            return props.field.value.locales.reduce((count, locale) => {
                return locale.translated ? count + 1 : count;
            }, 0);
        });

        const getButtonClass = (local) => {
            return `btn btn-lang btn-default ${
                local.translated && translatedCount.value > 1 ? 'btn-with-delete ' : ''
            }btn-language-${local.value} ${
                local.translated ? 'btn-translated' + (local.selected ? '-selected' : '') : 'btn-untranslated' + (local.selected ? '-selected' : '')
            }`;
        };

        const changeLocale = (field,locale) => {
            emit('change', field,locale);
        };

        const emitChange = () => {
            emit('change', selectedLocale.value);
        };

        const openRemoveModal = (value) => {
            removeModalOpen.value = true;
            deletedItem.value = value;
        };

        const closeRemoveModal = () => {
            removeModalOpen.value = false;
            deletedItem.value = null;
        };

        const confirmDelete = () => {
            emit('delete', deletedItem.value);
        };

        return {
            selectedLocale,
            removeModalOpen,
            deletedItem,
            translatedCount,
            getButtonClass,
            changeLocale,
            emitChange,
            openRemoveModal,
            closeRemoveModal,
            confirmDelete
        };
    }
};
</script>
