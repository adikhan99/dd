import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/index'

type ModalView =
    | "ADD_USER_MODAL"
    | "EDIT_USER_MODAL"
    | "ACTIVE_USER_MODAL"
    | "INACTIVE_USER_MODAL"
    | "PARENT_DETAILS_MODAL"
    | ""

type ModalStatetypes = {
    data?: any
    view: ModalView
    isLoading: boolean
}

const initialState: ModalStatetypes = { view: '', data: null, isLoading: false }

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setModalState: (
            state,
            action: PayloadAction<{ view: ModalView; data?: any }>
        ) => {
            state.view = action.payload.view
            state.data = action.payload.data || null
        },
        setLoadingState: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
        removeModalState: (state) => {
            state.view = ''
            state.data = null
        }
    }
})

export const useModal = () => {
    const modalState = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch()

    const openModal = (payload: { view: ModalView; data?: any }) => {
        dispatch(setModalState(payload))
    }

    const closeModal = () => {
        dispatch(removeModalState())
    }

    const setLoading = (isLoading: boolean) => {
        dispatch(setLoadingState({ isLoading }))
    }

    return { modalState, openModal, closeModal, setLoading }
}

// Export actions properly
export const { removeModalState, setModalState, setLoadingState } = modalSlice.actions

export default modalSlice.reducer
