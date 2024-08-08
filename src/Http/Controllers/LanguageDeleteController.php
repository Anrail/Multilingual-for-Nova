<?php

namespace Anrail\NovaMultilingualTool\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Nova\Nova;

class LanguageDeleteController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param $locale
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request, $locale)
    {
        $resourceClass = Nova::resourceForKey($request->get("resourceName"));

        abort_if(!$resourceClass, 404, "Missing resource class");

        $modelClass = $resourceClass::$model;

        $resource = $modelClass::find($request->get("resourceId"));

        abort_if(!$resource, 404, "Missing resource");

        if ($resource->forgetAllTranslations($locale)->save()) {
            return response()->json(['status' => true]);
        }

        return response()->json(['status' => false]);
    }
}
