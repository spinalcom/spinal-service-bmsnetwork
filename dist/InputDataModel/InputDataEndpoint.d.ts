import { InputDataEndpointDataType } from './InputDataEndpointDataType';
import { InputDataEndpointType } from './InputDataEndpointType';
export declare class InputDataEndpoint {
    id: string;
    name: string;
    path: string;
    currentValue: number | string;
    unit: string;
    dataType: InputDataEndpointDataType;
    type: InputDataEndpointType;
    nodeTypeName: string;
}
