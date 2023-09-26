import DangerButton from "@/Components/DangerButton";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Genre({ auth, genre, no }) {
    const MySwal = withReactContent(Swal);
    const handleDelete = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "Data Can Delete Permanent!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/genre/delete/${id}`);
            }
        });
    };
    const { flash } = usePage().props;
    {
        flash.message &&
            Swal.fire({
                icon: "success",
                title: "success",
                text: flash.message,
            });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Genre
                </h2>
            }
        >
            <Head title="Genre" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 pt-6 pb-3 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-extrabold dark:text-white">
                                Data Genre
                            </h2>
                        </div>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className="px-6 pb-3 text-gray-900 dark:text-gray-100">
                            <LinkButton className="" href={`/genre/create`}>
                                Create
                            </LinkButton>
                        </div>
                        <div className="px-6 pb-3 text-gray-900 dark:text-gray-100">
                            <table className="table-auto border bg-dark w-full text-center">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">No</th>
                                        <th
                                            className="border px-4 py-2"
                                            width="700"
                                        >
                                            Genre
                                        </th>
                                        <th className="border px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {genre.map((gen) => (
                                        <tr key={gen.name_genre}>
                                            <td
                                                className="border px-4 py-2"
                                                key={gen.id}
                                            >
                                                {no++}
                                            </td>
                                            <td
                                                className="border px-4 py-2"
                                                key={gen.name_genre}
                                            >
                                                {gen.name_genre}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <LinkButton
                                                    className="ml-4 "
                                                    href={`/genre/edit/${gen.id}`}
                                                >
                                                    Edit
                                                </LinkButton>
                                                <DangerButton
                                                    onClick={() =>
                                                        handleDelete(gen.id)
                                                    }
                                                    className="ml-4"
                                                >
                                                    Hapus
                                                </DangerButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
