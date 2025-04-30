import { getAllEmailTemplates, getEmailTemplateByType, updateEmailTemplate, sendEmailByTemplate } from "@/api/services/emailTemplate.service"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query"

// Query keys
const EMAIL_TEMPLATES_KEY = "emailTemplates"
const EMAIL_TEMPLATE_KEY = "emailTemplate"
const EMAIL_SEND_KEY = "sendEmail"

// Get all email templates
export const useGetAllEmailTemplates = (params?: {
  order?: "ASC" | "DESC"
  page?: number
  take?: number
  search?: string
  type?: string
}): UseQueryResult<any> => {
  return useQuery({
    queryKey: [EMAIL_TEMPLATES_KEY, params],
    queryFn: () => getAllEmailTemplates(params),
  })
}

// Get email template by type
export const useGetEmailTemplateByType = (type: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: [EMAIL_TEMPLATE_KEY, type],
    queryFn: () => getEmailTemplateByType(type),
    enabled: !!type,
  })
}

// Update email template
export const useUpdateEmailTemplate = (): UseMutationResult<any, Error, { type: string; payload: any }> => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, { type: string; payload: any }>({
    mutationFn: ({ type, payload }) => updateEmailTemplate(type, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [EMAIL_TEMPLATE_KEY, variables.type] })
      queryClient.invalidateQueries({
        queryKey: [EMAIL_TEMPLATES_KEY],
      })
    },
  })
}

// Send email by template type
export const useSendEmailByTemplate = (): UseMutationResult<any, Error, { userId: string; templateType: string }> => {
  return useMutation<any, Error, { userId: string; templateType: string }>({
    mutationFn: (payload) => sendEmailByTemplate(payload),
    mutationKey: [EMAIL_SEND_KEY],
  })
} 