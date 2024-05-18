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
    // endpoints 用来定义 endpoint 方法，每个 endpoint 方法都对应一个数据获取操作。
    // 每个 endpoint 方法都接收一个配置对象作为参数，该配置对象定义了对应数据获取操作的属性和行为。
    // 例如，getStudents 方法用于获取学生数据，getTeacher 方法用于获取老师数据等。
    endpoints: (builder) => ({
        getStudents: builder.query({
            // query 用来指定 endpoint 方法的请求路径。
            query: () => "students",
        }),
    }),
})

// API 对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求，获取数据，并对数据进行处理。
// 钩子函数的命名规则 getStudents -> useGetStudentsQuery
export const { useGetStudentsQuery } = studentApi;
export default studentApi;

