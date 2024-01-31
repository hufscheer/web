CHROMATIC_PROJECT_TOKEN=$(grep CHROMATIC_PROJECT_TOKEN .env | cut -d "=" -f2)
pnpm dlx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --exit-once-uploaded --allow-console-errors --build-script-name=build
