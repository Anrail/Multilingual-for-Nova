<template>
    <div>
        <heading class="mb-6">{{ __('Language') }}</heading>

        <card class="flex p-3">
            <div class="flex border-b border-40 w-full">
                <div class="w-1/4 py-6 px-8">
                    <label class="inline-block text-80 pt-2 leading-tight" for="language">{{__('Select Language')}}</label>
                </div>
                <div class="py-6 px-8 w-1/2">
                    <select v-model="currentLocal" id="language" dusk="language" :placeholder="__('Select Language')" class="w-full form-control form-select">
                        <option v-for="(value, key) in locals" :key="value" :value="key">
                            {{ value }}
                        </option>
                    </select>
                    <div class="help-text help-text mt-2"></div>
                </div>
                <div class="py-6 px-2 w-1/4">
                    <button type="button" class="btn btn-default btn-primary inline-flex items-center relative ml-auto mr-3" dusk="change-language-button" @click="changeLocal">
                        <span class="">{{__('Change Language')}}</span>
                    </button>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

export default {
    setup() {
        const currentLocal = ref(window.config.currentLocal);
        const locals = ref(window.config.locals);

        const changeLocal = () => {
            window.location = replaceUrlParam(window.location.href, 'lang', currentLocal.value);
        };

        const getLocals = async () => {
            try {
                const response = await Nova.request().get('/nova-vendor/nova-multilingual-tool/locals');
                locals.value = response.data;
            } catch (error) {
                console.error('Error fetching locals:', error);
            }
        };

        const getCurrentLocal = async () => {
            try {
                const response = await Nova.request().get('/nova-vendor/nova-multilingual-tool/current-local');
                currentLocal.value = response.data;
            } catch (error) {
                console.error('Error fetching current local:', error);
            }
        };

        const replaceUrlParam = (url, paramName, paramValue) => {
            if (paramValue == null) {
                paramValue = '';
            }
            const pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, '$1' + paramValue + '$2');
            }
            url = url.replace(/[?#]$/, '');
            return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
        };

        return {
            currentLocal,
            locals,
            changeLocal,
            getLocals,
            getCurrentLocal,
            replaceUrlParam
        };
    },
    mounted() {
        this.getCurrentLocal();
        this.getLocals();
    }
};
</script>
