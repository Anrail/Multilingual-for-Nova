<?php

namespace Anrail\NovaMultilingualTool\Http\Middleware;

use Anrail\NovaMultilingualTool\NovaMultilingualTool;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        return resolve(NovaMultilingualTool::class)->authorize($request) ? $next($request) : abort(403);
    }
}
