<?php

namespace Anrail\NovaMultilingualTool;

use Anrail\NovaMultilingualTool\Helper\NovaMultilingualHelper;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class ToolServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
//            Nova::script('nova-multilingual-tool', __DIR__.'/../dist/js/tool.js');
            Nova::script('nova-multilingual', __DIR__.'/../dist/js/field.js');
//            Nova::style('nova-multilingual-tool', __DIR__.'/../dist/css/tool.css');
            Nova::style('nova-multilingual', __DIR__.'/../dist/css/field.css');
        });

        // Завантаження представлень
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'nova-multilingual-tool');

        // Встановлення локалі на основі запиту
        $lang = request()->cookie('lang', config('app.locale'));
        if ($lang) {
            app()->setLocale($lang);
        }

        // Надання даних скриптам Nova
        Nova::serving(function () {
            Nova::provideToScript([
                'locals' => NovaMultilingualHelper::getSupportLocales(),
                'currentLocal' => app()->getLocale(),
            ]);
        });
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova'])
            ->prefix('nova-vendor/nova-multilingual-tool')
            ->group(__DIR__.'/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
