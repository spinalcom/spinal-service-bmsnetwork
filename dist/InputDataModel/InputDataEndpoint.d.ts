import { InputDataEndpointDataType } from './InputDataEndpointDataType';
export declare class InputDataEndpoint {
    id: string;
    name: string;
    path: string;
    currentValue: number | string;
    unit: string;
    dataType: InputDataEndpointDataType;
}
