<?php

namespace Anrail\NovaMultilingualTool;

use Laravel\Nova\Menu\MenuSection;
use Laravel\Nova\Tool;

class NovaMultilingualTool extends Tool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Nova Multilingual Tool';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'nova-multilingual-tool';
    }

    public function menu(\Illuminate\Http\Request $request)
    {
        return MenuSection::make($this->name())
            ->path('/nova-multilingual-tool')
            ->icon('globe');
    }
}
