CHROMATIC_TOKEN=$(grep CHROMATIC_TOKEN .env | cut -d "=" -f2)
pnpm dlx chromatic --project-token=$CHROMATIC_TOKEN --exit-once-uploaded --allow-console-errors