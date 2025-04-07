# 토이 서버

테스트를 위해서 간이로 만든 서버입니다

## 사용법

### 실행

```shell
  yarn dev
```

### 접근 테스트

```curl
curl -X POST http://localhost:3000/web
```

### 응답 예시

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Welcome to the HTML file!</h1>
  <p>This is a simple HTML file.</p>
</body>
</html>
```

### 주의사항

- React Native에서 직접 요청할 때에는 [와이파이 설정] - 연결된 와이파이의 [세부사항] - 최하단에 [IP 주소]로 호출해야합니다
  - 다만, 단순히 키만 얻는것이 목적이라면 꼭 항상 RN에서 직접 호출할 필요는 없습니다
- 서버가 실행되면 Postman, curl 등으로 먼저 테스트 해주세요
