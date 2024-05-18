import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 创建 api 对象
// createApi 用来创建一个 API 对象，该对象包含多个 endpoint 方法，用于定义不同的数据获取操作。
// 每个 endpoint 方法都对应一个数据获取操作，可以通过调用该方法来获取对应的数据。
// 例如，getStudents 方法用于获取学生数据，getTeacher 方法用于获取老师数据等。
// createApi 方法接收一个配置对象作为参数，该配置对象定义了 API 对象的属性和行为。
const studentApi = createApi({
    reducerPath: "studentApi", // api 的标识 不能和其它的api或 reducer 冲突
    // baseQuery 用来指定基础的请求方法，例如 fetch 或 axios。
    // 该方法接收一个配置对象作为参数，该配置对象定义了基础请求方法的属性和行为。
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }),
    // tagTypes 用来指定 endpoint 方法的类型，用于在 reducer 中区分不同的数据获取操作。
    tagTypes: ["Student"],
    // endpoints 用来定义 endpoint 方法，每个 endpoint 方法都对应一个数据获取操作。
    // 每个 endpoint 方法都接收一个配置对象作为参数，该配置对象定义了对应数据获取操作的属性和行为。
    // 例如，getStudents 方法用于获取学生数据，getTeacher 方法用于获取老师数据等。
    endpoints: (builder) => ({
        getStudents: builder.query({
            // query 用来指定 endpoint 方法的请求路径。
            query: () => "students",
            transformResponse: (response, meta, arg) => {
                // transformResponse 用来对请求到的数据进行处理。
                // 该方法接收三个参数：response 请求到的数据，meta 请求的元数据信息，arg 请求的参数。
                // 可以根据需要对 response 进行处理，例如转换为需要的格式等。
                return response.data;
            },
            // keepUnusedDataFor 用来设置缓存的时间，单位为秒。
            // 该方法接收一个参数：缓存的时间。
            // 设置缓存时间后，当再次请求相同的数据时，会优先从缓存中获取数据，而不是再次发送请求。
            // 这样可以提高应用程序的性能和效率。
            keepUnusedDataFor: 60, // 设置缓存时间，单位为秒，默认是0，表示不缓存
            // staleTime 用来设置缓存数据的过期时间，单位为秒。
            // 该方法接收一个参数：缓存数据的过期时间。
            // 当缓存数据过期后，应用程序会再次发送请求获取最新数据。
            // 这样可以保证缓存数据的实时性。
            staleTime: 60, // 设置缓存数据的过期时间，单位为秒，默认是0，表示不设置过期时间

            // providesTags 用来设置 endpoint 方法的类型，用于在 reducer 中区分不同的数据获取操作。
            providesTags: [{ type: "Student", id: "LIST" }] // 设置 endpoint 方法的类型，用于在 reducer 中区分不同的数据获取操作。
        }),
        getStudentByID: builder.query({
            query: (id) => `students/${id}`,
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
            keepUnusedDataFor: 60, // 设置缓存时间，单位为秒，默认是0，表示不缓存
            staleTime: 60, // 设置缓存数据的过期时间，单位为秒，默认是0，表示不设置过期时间
            providesTags: (result, error, id) => [{ type: "Student", id }]
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `students/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
        }),
        createStudent: builder.mutation({
            query: (student) => ({
                url: "students",
                method: "POST",
                body: { data: student },
            }),
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
            invalidatesTags: [{ type: "Student", id: "LIST" }] // 设置 endpoint 方法的类型，用于在 reducer 中区分不同的数据获取操作。
        }),
        updateStudent: builder.mutation({
            query: (student) => ({
                url: `students/${student.id}`,
                method: "PUT",
                body: { data: student.attributes },
            }),
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
            invalidatesTags: (result, error, student) => [{ type: "Student", id: student.id }, { type: "Student", id: "LIST" }]
        })
    }),
},

)

// API 对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求，获取数据，并对数据进行处理。
// 钩子函数的命名规则 getStudents -> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIDQuery,
    useDeleteStudentMutation,
    useCreateStudentMutation,
    useUpdateStudentMutation
} = studentApi;
export default studentApi;

