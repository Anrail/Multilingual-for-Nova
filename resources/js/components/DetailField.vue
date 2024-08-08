<template>
    <panel-item :field="field">
        <template #value>
            <language-ui :field="field" :resourceName="resourceName" @change="redirect" @delete="deleteLocale"/>
        </template>
    </panel-item>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import LanguageUI from './LanguageUI';
import { global } from '../mixin/global';

export default defineComponent({
    props: ['resource', 'resourceName', 'resourceId', 'field'],
    mixins: [global],
    components: {
        LanguageUI
    },
    setup(props) {
        onMounted(() => {
            if (
                props.field.value.style === 'list' ||
                (props.field.value.style === 'mix' &&
                    props.field.value.locales.length > props.field.value.convert_to_list_after)
            ) {
                const locales = props.field.value.locales.map(item => {
                    if (item.translated) item.label += " -translated";
                    return item;
                });
                Object.assign(props.field, { options: locales });
            }
        });


        const redirect = (field,locale) => {
            global.methods.redirect(field,props.resourceName,locale);
            // window.location = global.methods.replaceUrlParam(window.location.href, 'lang', locale);
        };

        const deleteLocale = (locale) => {
            global.methods.deleteLocale(locale);
        };

        return {
            redirect,
            deleteLocale
        };
    }
});
</script>
