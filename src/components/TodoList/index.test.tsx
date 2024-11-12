import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {TodoList} from './index';

describe('TodoList Component', () => {
    it('renders input add task field', () => {
        render(<TodoList />);

        const inputAddTask = screen.getByTestId('input-add-task');
        expect(inputAddTask).toBeInTheDocument();
    });

    it('adds a new task on pressing Enter', () => {
        render(<TodoList />);

        const inputAddTask = screen.getByTestId('input-add-task');

        fireEvent.change(inputAddTask, { target: { value: 'New Task' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(screen.getByText('New Task')).toBeInTheDocument();
        expect(inputAddTask).toHaveValue('');

        const divTask = screen.getByTestId('div-task');
        expect(divTask).toBeInTheDocument();

        const inputCheckbox = screen.getByTestId('input-checkbox');
        expect(inputCheckbox).not.toBeChecked();

        fireEvent.click(inputCheckbox);
        expect(inputCheckbox).toBeChecked();

        fireEvent.click(inputCheckbox);
        expect(inputCheckbox).not.toBeChecked();
    });

    it('filters tasks based on selected filter',  async () => {
        render(<TodoList />);

        const inputAddTask = screen.getByTestId('input-add-task');

        fireEvent.change(inputAddTask, { target: { value: 'Active Task' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.change(inputAddTask, { target: { value: 'Completed Task' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });

        const checkboxTasks = screen.getAllByTestId('input-checkbox');
        fireEvent.click(checkboxTasks[1]);

        fireEvent.click(screen.getByLabelText('Active', { selector: 'button' }));
        expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
        expect(screen.getByText('Active Task')).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Completed', { selector: 'button' }));
        expect(screen.queryByText('Active Task')).not.toBeInTheDocument();
        expect(screen.getByText('Completed Task')).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('All', { selector: 'button' }));
        expect(screen.getByText('Active Task')).toBeInTheDocument();
        expect(screen.getByText('Completed Task')).toBeInTheDocument();
    });

    it('clears all completed tasks', () => {
        render(<TodoList />);

        const inputAddTask = screen.getByTestId('input-add-task');

        fireEvent.change(inputAddTask, { target: { value: 'Task 1' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });
        fireEvent.change(inputAddTask, { target: { value: 'Task 2' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });

        const checkboxTasks = screen.getAllByTestId('input-checkbox');
        fireEvent.click(checkboxTasks[1]);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Clear completed', { selector: 'button' }));
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).toBeInTheDocument();
    });

    it('displays the correct count of items left', () => {
        render(<TodoList />);

        const inputAddTask = screen.getByTestId('input-add-task');

        fireEvent.change(inputAddTask, { target: { value: 'Task 1' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });
        fireEvent.change(inputAddTask, { target: { value: 'Task 2' } });
        fireEvent.keyPress(inputAddTask, { key: 'Enter', code: 'Enter', charCode: 13 });

        const checkboxTasks = screen.getAllByTestId('input-checkbox') as HTMLInputElement[];
        fireEvent.click(checkboxTasks[1]);

        const incompleteTasks = checkboxTasks
            .map((checkbox, index) => ({ checkbox, taskText: screen.getAllByTestId('div-task')[index].children[1].textContent }))
            .filter(({ checkbox }) => !checkbox.checked);

        expect(screen.getByText(`${incompleteTasks.length} items left`)).toBeInTheDocument();
    });
});