import React, { memo, useContext } from "react"

import Table from "../../components/Table"
import history from "../../helpers/history"

import { rootStore } from "../rootStore"

const options = {
    head: [
        {
            width: 200,
            column: 'name',
            label: 'Nama pengguna'
        },
        {
            width: 70,
            column: 'phone',
            label: 'No. telepon'
        },
        {
            width: 50,
            column: 'active',
            label: 'Status aktif',
            render: x => (x.active === 1 ? 'aktif' : 'tidak aktif')
        }
    ],
    action: [
        {
            label: 'Ubah',
            key: 'user',
            action: 'edit',
            icon: 'edit',
            iconIntent: 'warning',
            do: x => history.push(`input/${x.id}`)
        },
        {
            label: 'Hapus',
            key: 'user',
            action: 'delete',
            icon: 'trash',
            iconIntent: 'danger',
            do: x => { },
            disabled: x => { }
        }
    ],
    filter: ''
}

const UserView = () => {

    const { rootState } = useContext(rootStore)
    const { user } = rootState

    return (
        <div className="container w-full mx-auto p-4">
            <h3 className="text-base font-bold mb-4">User</h3>

            <div className="bg-white shadow p-4">
                <Table data={user} options={options} height={window.innerHeight - 150} />
            </div>
        </div>
    )
}

export default memo(UserView)