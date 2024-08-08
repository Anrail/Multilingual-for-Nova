<template>
    <div class="p-3">
        <select v-model="currentLocal" class="w-full form-control form-select"
                @change="changeLocal">
            <option v-for="(value, key) in locals" :key="value" :value="key">
                {{ value }}
            </option>
        </select>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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

        onMounted(() => {
            getCurrentLocal();
            getLocals();
        });

        return {
            currentLocal,
            locals,
            changeLocal,
            getLocals,
            getCurrentLocal,
            replaceUrlParam
        };
    }
};
</script>
