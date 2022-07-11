FROM mcr.microsoft.com/playwright:v1.23.1-focal

COPY . /tests

WORKDIR /tests

RUN npm ci

RUN npx playwright install --with-deps

ENTRYPOINT npx playwright test

# docker run --ipc=host --cap-add=SYS_ADMIN -v /Users/v.kharchenko/projects/ui-test/playwright-report:/tests/playwright-report ui-test