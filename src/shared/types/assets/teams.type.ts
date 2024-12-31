import { InferType, object, string } from "yup";

export const TeamSchema = object({
  name: string().required("팀 이름은 필수 입력 사항입니다"),
});

export type Team = InferType<typeof TeamSchema>;

export type RawTeams = Array<Team>;
