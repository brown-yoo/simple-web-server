import { InferType, object, string } from "yup";

export const DeveloperSchema = object({
  name: string()
    .trim()
    .required("이름은 필수 입력 사항입니다")
    .nonNullable("이름은 필수 입력 사항입니다.")
    .min(2, "이름은 최소 2글자 이상이어야 합니다.")
    .max(20, "이름은 최대 20글자까지 가능합니다."),
  team: string()
    .trim()
    .required("팀은 필수 입력 사항입니다")
    .nonNullable("팀은 필수 입력 사항입니다.")
    .oneOf(
      [
        "모바일팀",
        "시스템개발팀",
        "서비스개발팀",
        "프로덕트팀",
        "프로덕트팀 QA파트",
      ],
      "팀은 다음 중 하나여야 합니다: 모바일팀, 시스템개발팀, 서비스개발팀, 프로덕트팀, 프로덕트팀 QA파트"
    ),
});

export type Developer = InferType<typeof DeveloperSchema>;

export interface RawDevelopers {
  developers: Developer[];
}
