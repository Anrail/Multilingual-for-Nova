export const global = {
    methods: {
        redirect(field, resourceName,locale) {
            console .log();
            console .log(field);
            this.setLanguageCookie(locale);
            console .log(field.url + '/resources/' + resourceName + "/" + field.value.id + "/edit", 'lang', locale);
            window.location = this.replaceUrlParam(field.url + '/resources/' + resourceName + "/" + field.value.id + "/edit", 'lang', locale);
            // window.location = this.replaceUrlParam(this.field.value.url + '/resources/' + this.resourceName + "/" + this.field.value.id + "/edit", 'lang', locale);
            // this.this.replaceUrlParam(this.field.url + '/resources/' + this.resourceName + "/" + this.field.value.id + "/edit", 'lang', locale);
            // window.location.reload();
        },

        setLanguageCookie(locale){
            document.cookie = `lang=${locale};path=/;max-age=31536000`; // Встановлення cookie на 1 рік
            // window.location.reload(); // Перезавантаження сторінки для відображення змін
        },

        localClicked(locale){
            if (this.isEditing.value) {
                if (confirm('Are you sure you want to leave the page without saving?')) {
                    this.setLanguageCookie(locale);
                }
            } else {
                this.setLanguageCookie(locale);
            }
        },

        changeLocal(){
            // window.location = this.replaceUrlParam(window.location.href, 'lang', this.currentLocal);
            this.setLanguageCookie(this.currentLocal.value);
        },


        replaceUrlParam(url, paramName, paramValue) {
            this.setLanguageCookie(paramValue)
            if (paramValue == null) {
                paramValue = '';
            }
            var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, '$1' + paramValue + '$2');
            }
            url = url.replace(/[?#]$/, '');
            return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
        },

        // changeLocal() {
        //     window.location = this.replaceUrlParam(window.location.href, 'lang', this.currentLocal);
        // },
        //
        // localClicked(local) {
        //     if(this.isEditing) {
        //         if(confirm('Are you sure you want to leave the page without saving?')) {
        //             this.currentLocal = local;
        //             window.location = this.replaceUrlParam(window.location.href, 'lang', this.currentLocal);
        //         }
        //     } else {
        //         this.currentLocal = local;
        //         window.location = this.replaceUrlParam(window.location.href, 'lang', this.currentLocal);
        //     }
        // },
        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.currentLocal || ''
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value
        },

        deleteLocale(locale) {
            Nova
                .request()
                .post(
                    "/nova-vendor/multilingual-nova/remove-local/" +
                    locale +
                    "?resourceId=" +
                    this.field.value.id +
                    "&resourceName=" +
                    this.resourceName,
                    {
                        _method: "DELETE"
                    }
                )
                .then((response) => {
                    if (response.status === 200 && response.statusText === 'OK') {
                        this.replaceUrlParam(window.location.href, 'lang', locale);
                    }
                });
        }
    }
}
