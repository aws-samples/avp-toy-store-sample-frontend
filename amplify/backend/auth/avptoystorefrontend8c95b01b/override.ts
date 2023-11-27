import { AmplifyAuthCognitoStackTemplate, AmplifyProjectInfo } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
    
    const department = {
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'department',
        required: false
    }
    
    const jobLevel = {
        attributeDataType: 'Number',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'jobLevel',
        required: false
    }

    resources.userPool.schema = [
        ...(resources.userPool.schema as any[]), // Carry over existing attributes (example: email)
        department, jobLevel]
    
    resources.userPoolClientWeb.writeAttributes = [
        "email"
    ]
    
    resources.userPoolClient.writeAttributes = [
        "email"
    ]
}