import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { keys } from 'lodash';

@Injectable({ providedIn: 'root' })
export abstract class ComponentStoreBase<State extends object> extends ComponentStore<State> {
    constructor(private initialState: State) {
        super(initialState);
    }

    get getStates(): State {
        return this.get();
    }

    readonly updateState = this.updater((state, newState?: State) => ({
        ...state,
        ...newState
    }));

    readonly clearAllState = this.updater((state) => {
        try {
            const newState: State = {} as State;

            keys(state).forEach((key) => {
                newState[key] = undefined;
            });

            return {
                ...state,
                ...newState
            };
        } catch (error) {
            throw error;
        }
    });
}
