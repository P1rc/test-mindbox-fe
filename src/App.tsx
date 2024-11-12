import React from 'react';
import {BoxComponent, TypographyComponent} from './components/TodoList/styled';
import {TodoList} from './components/TodoList';

export const App = () => {
    return (
        <BoxComponent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TypographyComponent variant='h1' sx={{ color: 'rgba(255, 127, 80, 0.3)' }}>todos</TypographyComponent>

            <TodoList />
        </BoxComponent>
    )
}