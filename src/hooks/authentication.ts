import { getProfile, signIn } from "@/api/services/auth.service";
import { ISignIn } from "@/interface/request/authentication";
import { IAuthResponse } from "@/interface/response/authentication";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";

export const useSignIn = (): UseMutationResult<
  IAuthResponse,
  Error,
  ISignIn
> => {
  return useMutation<IAuthResponse, Error, ISignIn>({
    mutationFn: (params: ISignIn) => signIn(params),
    onSuccess: (result: IAuthResponse) => {
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};

export const useGetProfileData = () => {
  const {
    data: profileData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getProfile(),
  })

  return {
    profileData,
    isLoading,
    isFetching,
    refetch,
  }
}