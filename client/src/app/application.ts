import { api, APPLICATION_TAG } from "./api";
import type {
  Application,
  ApplicationFormData,
  ApplicationQueryParams,
} from "@/types/application";

export interface ApplicationListResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateApplicationArgs {
  id: string;
  data: Partial<ApplicationFormData>;
}

const applicationTags = {
  list: () => ({ type: APPLICATION_TAG, id: "LIST" } as const),
  one: (id: string) => ({ type: APPLICATION_TAG, id } as const),
};

const provideApplicationTags = (applications?: Application[]) =>
  applications
    ? [
        ...applications.map(({ id }) => applicationTags.one(id)),
        applicationTags.list(),
      ]
    : [applicationTags.list()];

export const applicationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listApplications: builder.query<
      ApplicationListResponse,
      ApplicationQueryParams | void
    >({
      query: (params) => ({
        url: "/applications",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        provideApplicationTags(result?.applications),
    }),

    getApplication: builder.query<Application, string>({
      query: (id) => `/applications/${id}`,
      providesTags: (_result, _error, id) => [
        applicationTags.one(id),
      ],
    }),

    addApplication: builder.mutation<
      Application,
      ApplicationFormData
    >({
      query: (data) => ({
        url: "/applications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [applicationTags.list()],
    }),

    updateApplication: builder.mutation<
      Application,
      UpdateApplicationArgs
    >({
      query: ({ id, data }) => ({
        url: `/applications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        applicationTags.one(id),
        applicationTags.list(),
      ],
    }),

    deleteApplication: builder.mutation<void, string>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        applicationTags.one(id),
        applicationTags.list(),
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListApplicationsQuery,
  useGetApplicationQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationApi;