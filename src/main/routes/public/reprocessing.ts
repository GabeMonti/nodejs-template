import { Route } from '@/infra/http/utils/http-server/types';
import { requestValidationAdapter } from '@/main/adapters';
import {
  makeGetReprocessingDataController,
  makePublishDataToReprocessController
} from '@/main/factories/controllers';
import {
  makeDeleteReprocessingByIdentifierMiddleware,
  makeGetReprocessingDataMiddleware,
  makeGetReprocessingDataByIdentifierMiddleware,
  makePublishDataToReprocessingMiddleware
} from '@/main/factories/middlewares';
import { publishDataToReprocessSchema } from '@/validation/usecases';

export default function (route: Route) {
  route.post(
    '/reprocessings',
    requestValidationAdapter(publishDataToReprocessSchema),
    makeGetReprocessingDataByIdentifierMiddleware(),
    makePublishDataToReprocessingMiddleware(),
    makeDeleteReprocessingByIdentifierMiddleware(),
    makePublishDataToReprocessController()
  );

  route.get(
    '/reprocessings',
    makeGetReprocessingDataMiddleware(),
    makeGetReprocessingDataController()
  );
}
