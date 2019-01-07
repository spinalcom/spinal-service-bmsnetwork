import { InputDataEndpoint } from './InputDataEndpoint';
import { InputDataEndpointGroup } from './InputDataEndpointGroup';
export interface InputDataDevice {
    id: string;
    name: string;
    type: string;
    path: string;
    children: (InputDataEndpoint | InputDataEndpointGroup | InputDataDevice)[];
    nodeTypeName: string;
}
