import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
    AccordionComponent,
    AccordionDetailsComponent,
    AccordionSummaryComponent,
    BoxComponent,
    ButtonComponent,
    CheckboxComponent,
    TextFieldComponent,
    TypographyComponent
} from './styled';

interface ITask {
    id: number
    title: string
    completed: boolean
}

type TFilter = 'all' | 'active' | 'completed';

export const TodoList = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const filters: TFilter[] = ['all', 'active', 'completed'];
    const [activeFilter, setActiveFilter] = useState<TFilter>('all');
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (activeFilter === 'active') return !task.completed;
            if (activeFilter === 'completed') return task.completed;
            return task;
        });
    }, [tasks, activeFilter]);

    const handleFilterClick = useCallback((filter: TFilter) => {
        setActiveFilter(filter);
    }, []);

    const handleExpandChange = () => {
        setExpanded(prev => !prev);
    };

    const handleCheckboxChange = useCallback((id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    const handleAddTask = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputRef.current && inputRef.current?.value.trim() !== '') {
            const newTask = {
                id: tasks.length + 1,
                title: inputRef.current.value,
                completed: false,
            };

            setTasks(prev => [...prev, newTask]);

            if (!tasks.length) {
                setExpanded(true);
            }

            inputRef.current.value = '';
        }
    }, [tasks]);

    const handleClearCompletedTasks = useCallback(() => {
        setTasks(prev => prev.map(task => ({ ...task, completed: false })));
    }, []);

    return (
        <BoxComponent sx={{
            marginTop: '40px',
            minWidth: '40%',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiPaper-root': {
                margin: 0,
            }
        }}>
            <AccordionComponent expanded={expanded} onChange={handleExpandChange}>
                <AccordionSummaryComponent>
                    <TextFieldComponent
                        data-testid='input-add-task'
                        inputRef={inputRef}
                        onClick={(event) => event.stopPropagation()}
                        onKeyPress={handleAddTask}
                    />
                </AccordionSummaryComponent>

                {!!tasks.length &&
                    <>
                        {filteredTasks.map(task => (
                            <AccordionDetailsComponent
                                data-testid='div-task'
                                sx={{ cursor: 'pointer' }}
                                key={task.id}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleCheckboxChange(task.id);
                                }}
                            >
                                <CheckboxComponent data-testid='input-checkbox' checked={task.completed} />

                                <TypographyComponent completed={task.completed}>
                                    {task.title}
                                </TypographyComponent>
                            </AccordionDetailsComponent>
                        ))}

                        <AccordionDetailsComponent
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <TypographyComponent
                                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                            >
                                {`${filteredTasks.filter(task => !task.completed).length} items left`}
                            </TypographyComponent>

                            <BoxComponent
                                data-testid='div-filters'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                {filters.map((filter) => (
                                    <ButtonComponent
                                        key={filter}
                                        aria-label={filter[0].toUpperCase() + filter.slice(1)}
                                        isActive={activeFilter === filter}
                                        onClick={() => handleFilterClick(filter)}
                                    >
                                        {filter[0].toUpperCase() + filter.slice(1)}
                                    </ButtonComponent>
                                ))}
                            </BoxComponent>

                            <ButtonComponent
                                aria-label='Clear completed'
                                onClick={handleClearCompletedTasks}
                            >
                                Clear completed
                            </ButtonComponent>
                        </AccordionDetailsComponent>
                    </>
                }
            </AccordionComponent>
        </BoxComponent>
    )
}