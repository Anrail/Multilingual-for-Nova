<template>
    <default-field :field="field">
        <template #field>
            <div class="o1-flex o1-items-center o1-space-x-0" v-if="field.value.style === 'button' || (field.value.style === 'mix' && locals.length <= field.value.convert_to_list_after)">
                <span v-for="local in field.value.locales" :key="local.value" class="o1-flex">
                    <a :title="(local.translated ? 'Translated' : 'Untranslated') + ' Language'"
                       :class="getButtonClass(local)"
                       href="#" @click.prevent="localClicked(local.value)">
                        {{ local.label }}
                    </a>
                    <a href="#" v-if="local.translated && translatedCount > 1"
                       @click.prevent="deleteLocale(local.value)"
                       class="btn-delete">X</a>
                </span>
            </div>
            <div v-if="field.value.style === 'list' || (field.value.style === 'mix' && locals.length > field.value.convert_to_list_after)">
                <select :id="field.name" v-model="currentLocal" class="w-full form-control form-select"
                        :class="errorClasses" :placeholder="field.name" @change="changeLocal">
                    <option v-for="local in locals" :key="local.label" :value="local.value">
                        {{ local.label }}
                    </option>
                </select>
            </div>
        </template>
    </default-field>
</template>

<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {FormField, HandlesValidationErrors} from 'laravel-nova';
import {global} from '../mixin/global';

export default defineComponent({
    mixins: [FormField, HandlesValidationErrors, global],

    props: ['resourceName', 'resourceId', 'field'],

    setup(props) {
        const currentLocal = ref(window.Nova.appConfig.locale);
        const locals = ref(window.Nova.appConfig.locals);
        const isEditing = ref(false);

        const translatedCount = computed(() => {
            return props.field.value.locales.reduce((count, locale) => {
                return locale.translated ? count + 1 : count;
            }, 0);
        });

        const getButtonClass = (local) => {
            return `btn btn-lang btn-default  ${
                local.translated && translatedCount.value > 1 ? 'btn-with-delete ' : ''
            }btn-language-${local.value} ${
                local.translated ? 'btn-translated' + (local.selected ? '-selected' : '') : 'btn-untranslated' + (local.selected ? '-selected' : '')
            }`;
        };

        const localClicked = (locale) => {
            if (isEditing.value) {
                if (confirm('Are you sure you want to leave the page without saving?')) {
                    currentLocal.value = locale;
                    global.methods.replaceUrlParam(window.location.href, 'lang', currentLocal.value);
                    window.location.reload();
                }
            } else {
                currentLocal.value = locale;
                global.methods.replaceUrlParam(window.location.href, 'lang', currentLocal.value);
                window.location.reload();
            }
        };

        const changeLocal = () => {
            global.methods.replaceUrlParam(window.location.href, 'lang', currentLocal.value);
            window.location.reload();
        };

        const deleteLocale = (locale) => {
            global.methods.deleteLocale(locale);
            window.location.reload();
        };

        onMounted(() => {
            if (props.field.value.style === 'list' || (props.field.value.style === 'mix' && props.field.value.locales.length > props.field.value.convert_to_list_after)) {
                const locales = props.field.value.locales.map(item => {
                    if (item.translated) item.label += " - translated";
                    return item;
                });
                Object.assign(props.field, { "options": locales });
            }
            isEditing.value = false;

            watch(() => props.field.value, (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    isEditing.value = true;
                }
            }, { deep: true });
        });

        return {
            currentLocal,
            locals,
            isEditing,
            translatedCount,
            getButtonClass,
            localClicked,
            changeLocal,
            deleteLocale
        };
    }
});
</script>
